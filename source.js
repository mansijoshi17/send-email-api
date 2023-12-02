const obj = {
  message: "This is message from source js",
  email: "mansijoshi17799@gmai.com",
};
const url = "http://localhost:3000/wwl/send-email";

const countryRequest = Functions.makeHttpRequest({
  url: url,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  data: {
    query: obj,
  },
});

// Execute the API request (Promise)
const countryResponse = await countryRequest;
if (countryResponse.error) {
  console.error(
    countryResponse.response
      ? `${countryResponse.response.status},${countryResponse.response.statusText}`
      : ""
  );
  throw Error("Request failed");
}

const countryData = countryResponse["data"]["data"];

if (!countryData || !countryData.country) {
  throw Error(`Make sure the country code "${countryCode}" exists`);
}

console.log("country response", countryData);

// result is in JSON object
const result = {
  status: countryData.success,
};

// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
return Functions.encodeString(JSON.stringify(result));
