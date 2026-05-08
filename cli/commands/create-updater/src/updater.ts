import { Command } from "commander";
import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";

const updaterCreateCommand = new Command("updater");

updaterCreateCommand.description("Create a new tsParticles updater");
updaterCreateCommand.argument("<destination>", "Destination folder");
updaterCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData({
    destination,
    nameLabel: "updater",
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "updater",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
  });
});

export { updaterCreateCommand };
