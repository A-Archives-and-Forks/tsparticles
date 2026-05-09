import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";
import { Command } from "commander";

const presetCreateCommand = new Command("preset");

presetCreateCommand.description("Create a new tsParticles preset");
presetCreateCommand.argument("<destination>", "Destination folder");
presetCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData({
    destination,
    nameLabel: "preset",
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "preset",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
  });
});

export { presetCreateCommand };
