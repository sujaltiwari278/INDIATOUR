import api from "./api";

export const translatePhrase = async (
  english,
  language
) => {
  const response = await api.post(
    "/translator/translate",
    {
      english,
      language,
    }
  );

  return response.data;
};

export const translateRealText = async (
  text,
  language
) => {
  const response = await api.post(
    "/translator/real",
    {
      text,
      language,
    }
  );

  return response.data;
};