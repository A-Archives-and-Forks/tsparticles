import { Command } from "commander";
import { createProjectTemplate, promptProjectData } from "@tsparticles/cli-create-utils";

const interactionCreateCommand = new Command("interaction");

interactionCreateCommand.description("Create a new tsParticles interaction");
interactionCreateCommand.argument("<destination>", "Destination folder");
interactionCreateCommand.action(async (destination: string) => {
  const data = await promptProjectData<"external" | "generic" | "particles">({
    destination,
    nameLabel: "interaction",
    select: {
      choices: [
        { title: "Generic (external + particles)", value: "generic" },
        { title: "External interaction", value: "external" },
        { title: "Particles interaction", value: "particles" },
      ],
      initial: "generic",
      message: "Which interaction type do you want to create?",
      name: "interactionType",
    },
  });

  await createProjectTemplate({
    description: data.description,
    destination: data.destinationPath,
    kind: "interaction",
    name: data.name,
    repositoryUrl: data.repositoryUrl,
    type: data.type,
  });
});

export { interactionCreateCommand };
