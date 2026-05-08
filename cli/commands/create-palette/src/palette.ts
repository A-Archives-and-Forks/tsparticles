import { Command } from "commander";
import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";

const paletteCreateCommand = new Command("palette");

paletteCreateCommand.description("Create a new tsParticles palette");
paletteCreateCommand.argument("<destination>", "Destination folder");
paletteCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData({
    destination,
    nameLabel: "palette",
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "palette",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
  });
});

export { paletteCreateCommand };
