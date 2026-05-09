import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";
import { Command } from "commander";

const pluginCreateCommand = new Command("plugin");

pluginCreateCommand.description("Create a new tsParticles plugin");
pluginCreateCommand.argument("<destination>", "Destination folder");
pluginCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData<"color-manager" | "easing" | "emitters-shape" | "export" | "generic">({
    destination,
    nameLabel: "plugin",
    select: {
      choices: [
        { title: "Generic plugin", value: "generic" },
        { title: "Emitters shape", value: "emitters-shape" },
        { title: "Easing", value: "easing" },
        { title: "Export", value: "export" },
        { title: "Color manager", value: "color-manager" },
      ],
      initial: "generic",
      message: "Which plugin type do you want to create?",
      name: "pluginType",
    },
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "plugin",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
    type: data.type,
  });
});

export { pluginCreateCommand };
