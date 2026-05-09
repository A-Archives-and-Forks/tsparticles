import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";
import { Command } from "commander";

const effectCreateCommand = new Command("effect");

effectCreateCommand.description("Create a new tsParticles effect");
effectCreateCommand.argument("<destination>", "Destination folder");
effectCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData({
    destination,
    nameLabel: "effect",
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "effect",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
  });
});

export { effectCreateCommand };
