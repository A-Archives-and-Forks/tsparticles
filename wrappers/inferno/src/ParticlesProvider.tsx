import { Component, type InfernoNode } from "inferno";
import { initParticlesEngine, isParticlesEngineInitialized } from "./initParticlesEngine";
import type { ParticlesPluginRegistrar } from "./initParticlesEngine";
import { getLogger } from "@tsparticles/engine";

// Lightweight subscription-based provider.
// We avoid calling Inferno.createContext at module initialization time
// (some builds of Inferno may not expose it on import). Instead we
// implement a tiny subscription mechanism that allows consumers to
// observe provider loaded status without requiring createContext.

let providerLoaded: boolean = isParticlesEngineInitialized();
const providerListeners: Array<(loaded: boolean) => void> = [];

function notifyProviderLoaded(value: boolean): void {
	providerLoaded = value;

	const listeners = providerListeners.slice();

	for (const l of listeners) {
		try {
			l(value);
		} catch {
			// swallow listener errors
		}
	}
}

export function subscribeToParticlesProvider(cb: (loaded: boolean) => void): () => void {
	providerListeners.push(cb);

	return () => {
		const idx = providerListeners.indexOf(cb);

		if (idx >= 0) {
			providerListeners.splice(idx, 1);
		}
	};
}

export interface IParticlesProviderProps {
	init?: ParticlesPluginRegistrar;
	children?: unknown;
}

export interface IParticlesProviderContext {
	loaded: boolean;
}

export class ParticlesProvider extends Component<IParticlesProviderProps, IParticlesProviderContext> {
	_cancelled = false;
	_unsub: (() => void) | undefined;

	constructor(props: IParticlesProviderProps) {
		super(props);

		this.state = {
			loaded: providerLoaded,
		} as IParticlesProviderContext;
	}

	componentDidMount() {
		// Keep state in sync with global provider
		if (providerLoaded) {
			this.setState({ loaded: true });
		} else {
			this._cancelled = false;

			void this.startInit(this.props.init);
		}

		// subscribe to global updates
		this._unsub = subscribeToParticlesProvider(v => this.setState({ loaded: v }));
	}

	componentDidUpdate(prevProps: IParticlesProviderProps) {
		// If an init callback identity changed and the engine is not yet
		// initialized, attempt to run the new init. initParticlesEngine will
		// await any in-flight initialization if necessary.
		if (prevProps.init !== this.props.init && !providerLoaded) {
			void this.startInit(this.props.init);
		}
	}

	componentWillUnmount() {
		this._cancelled = true;

		if (this._unsub) {
			this._unsub();
			this._unsub = undefined;
		}
	}

	async startInit(init?: ParticlesPluginRegistrar) {
		try {
			getLogger().debug("ParticlesProvider: starting engine init");

			await initParticlesEngine(init);

			if (!this._cancelled) {
				this.setState({ loaded: true });
				notifyProviderLoaded(true);
			}

			// eslint-disable-next-line no-console
			console.debug("ParticlesProvider: engine init completed");
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error("ParticlesProvider: engine init failed", e);
			if (!this._cancelled) {
				this.setState({ loaded: false });
				notifyProviderLoaded(false);
			}
		}
	}

	render(): InfernoNode | null {
		return this.state?.loaded ? this.props.children : null;
	}
}

export default ParticlesProvider;
