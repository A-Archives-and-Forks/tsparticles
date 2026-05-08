import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";
import { Command } from "commander";

const shapeCreateCommand = new Command("shape");

shapeCreateCommand.description("Create a new tsParticles shape");
shapeCreateCommand.argument("<destination>", "Destination folder");
shapeCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData({
    destination,
    nameLabel: "shape",
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "shape",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
  });
});

export { shapeCreateCommand };
