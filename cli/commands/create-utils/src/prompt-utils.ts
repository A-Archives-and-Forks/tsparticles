import { getDestinationDir, getRepositoryUrl } from "./file-utils.js";
import prompts, { type PromptObject } from "prompts";
import { capitalize } from "./string-utils.js";
import path from "node:path";

export interface ISelectChoice<T extends string> {
  title: string;
  value: T;
}

export interface IProjectPromptOptions<T extends string = string> {
  destination: string;
  nameLabel: string;
  select?: {
    choices: ISelectChoice<T>[];
    initial: T;
    message: string;
    name: string;
  };
}

export interface IProjectPromptResult<T extends string = string> {
  description: string;
  destinationPath: string;
  name: string;
  repositoryUrl: string;
  type: T | undefined;
}

/**
 * Prompts for common project creation data.
 * @param options - Prompt options
 * @returns Prompt result with normalized values
 */
export async function promptProjectData<T extends string = string>(
  options: IProjectPromptOptions<T>,
): Promise<IProjectPromptResult<T>> {
  const destinationPath = await getDestinationDir(options.destination),
    repositoryUrl = await getRepositoryUrl(),
    initialName = destinationPath.split(path.sep).pop() ?? "",
    questions: PromptObject[] = [
      {
        type: "text",
        name: "name",
        message: `What is the name of the ${options.nameLabel}?`,
        validate: (value: string) => (value ? true : "The name can't be empty"),
        initial: initialName,
      },
      {
        type: "text",
        name: "description",
        message: `What is the description of the ${options.nameLabel}?`,
        validate: (value: string) => (value ? true : "The description can't be empty"),
        initial: capitalize(initialName),
      },
      {
        initial: repositoryUrl,
        message: "What is the repository URL? (optional)",
        name: "repositoryUrl",
        type: "text",
      },
    ];

  if (options.select) {
    questions.push({
      type: "select",
      name: options.select.name,
      message: options.select.message,
      choices: options.select.choices,
      initial: options.select.choices.findIndex(t => t.value === options.select?.initial),
    });
  }

  const answers = (await prompts(questions)) as {
      [key: string]: unknown;
      description: string;
      name: string;
      repositoryUrl: string;
    },
    type = options.select ? (answers[options.select.name] as T | undefined) : undefined;

  return {
    description: answers.description.trim(),
    destinationPath,
    name: answers.name.trim(),
    repositoryUrl: answers.repositoryUrl.trim(),
    type,
  };
}
