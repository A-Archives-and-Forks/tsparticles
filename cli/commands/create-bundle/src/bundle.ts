import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";
import { Command } from "commander";

const bundleCreateCommand = new Command("bundle");

bundleCreateCommand.description("Create a new tsParticles bundle");
bundleCreateCommand.argument("<destination>", "Destination folder");
bundleCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData({
    destination,
    nameLabel: "bundle",
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "bundle",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
  });
});

export { bundleCreateCommand };
