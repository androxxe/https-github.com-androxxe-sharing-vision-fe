export type ErrorParseType = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  errors?: { [key: string]: string[] }[];
};
export const errorParse = (
  errorsData: any
): { title: string; description: string } => {
  try {
    let errorCode = errorList.find(
      (error: any) => error.key === errorsData.message
    );
    let title = errorCode ? errorCode.title : errorsData.message;

    console.log("errors", JSON.stringify(errorsData));
    let response = {
      title,
      // description: 'asd'
      description: Object.values(errorsData.errors).flat().join(", "),
    };

    return response;
  } catch (error: any) {
    return {
      title: "Something went wrong",
      description: error.message,
    };
  }
};

const errorList: { key: string; title: string; description: string }[] = [
  {
    key: "Payload_Invalid",
    title: "Payload invalid",
    description: "Data yang dimasukan tidak benar!",
  },
  {
    key: "Internal_Server_Error",
    title: "Internal server error",
    description: "Terjadi kesalahan pada server!",
  },
];
