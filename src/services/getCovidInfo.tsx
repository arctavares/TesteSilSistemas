import axios from "axios";

async function getCovidData(
  uf: string,
  setCovidData: React.Dispatch<React.SetStateAction<{
    cases: number;
}>>,
  setCovidError: React.Dispatch<React.SetStateAction<boolean>>,
  setCovidLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setCovidLoading(true);

    const response = await axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`);
    const data = response.data;
    setCovidData(data);

    setCovidError(false);
  } catch (error) {
    console.error("Error fetching COVID data:", error);
    setCovidError(true);
  } finally {
    setCovidLoading(false);
  }
}

export default getCovidData;