import { useState } from "react";
interface QueryParams {
  method: string;
  url: string;
  bodyData: {};
  token?: string;
  file?: any;
}
const BASE = "https://dark-field-959.fly.dev";
export default function useQuery() {
  const [loading, setLoading] = useState(false);

  async function query({
    method,
    url,
    bodyData,
    token = "",
    file = null,
  }: QueryParams) {
    let headers1 = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, //`Bearer ${token}`
    };

    let headers2 = {
      "Content-Type": "application/json",
    };
    const conditionalHeader = token ? headers1 : headers2;
    try {
      setLoading(true);
      if (method == "GET") {
        var response = await fetch(BASE + url, {
          headers: conditionalHeader,
          method,
        });
      } else {
        const formData = new FormData();

        if (file !== null) {
          formData.append("image", file);
          //   Object.keys(bodyData).forEach(key => {
          //     const value = bodyData[key];
          //     formData.append(key, value);
          //   });
        }

        var response = await fetch(BASE + url, {
          method,

          body: file == null ? JSON.stringify(bodyData) : formData,
        });
      }

      setLoading(false);
      const data = await response.json();
      if (response.ok) {
        return { success: true, data };
      }

      return { success: false, data: response };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err };
    }
  }

  return { loading, query };
}
