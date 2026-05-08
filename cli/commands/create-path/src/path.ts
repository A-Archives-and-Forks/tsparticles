import { Command } from "commander";
import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";

const pathCreateCommand = new Command("path");

pathCreateCommand.description("Create a new tsParticles path plugin");
pathCreateCommand.argument("<destination>", "Destination folder");
pathCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData({
    destination,
    nameLabel: "path plugin",
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "path",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
  });
});

export { pathCreateCommand };
