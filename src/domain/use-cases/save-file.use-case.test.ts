import fs from "fs";
import { SaveFile } from "./save-file.use-case";

describe("SaveFileUseCase", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs",
    fileName: "custom-table-name",
  };

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  //   beforeEach(() => {
  //     jest.clearAllMocks();

  //   });

  afterEach(() => {
    //clean up
    const outputFolderExists = fs.existsSync("outputs");
    if (outputFolderExists) fs.rmSync("outputs", { recursive: true });

    const customOutputFolderExists = fs.existsSync(
      customOptions.fileDestination
    );
    if (customOutputFolderExists)
      fs.rmSync(customOptions.fileDestination, { recursive: true });
  });

  test("Should save file with default values", () => {
    const saveFile = new SaveFile();
    const customFilePath = "outputs/table.txt";
    const customOptions = {
      fileContent: "test content",
    };

    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf-8" });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("Should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf-8" });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBeFalsy();

    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom writing error message");
      });

    const result = saveFile.execute({ fileContent: "Hola" });
    expect(result).toBeFalsy();

    writeFileSpy.mockRestore();
  });
});
