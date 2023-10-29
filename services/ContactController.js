const axios = require("axios");
require("dotenv").config();

async function addContact(token, payload) {
  try {
    return await axios({
      method: "post",
      url: `${process.env.API_DB_URL}/api/v1/contact`,
      headers: {
        token,
      },
      data: payload,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getContacts(
  { token, filter = {}, first = 100, skip = 0, orderBy = "-createdAt" },
  options
) {
  const payload = {
    query: `query contacts($skip: Int, $first: Int, $filter: JSON, $orderBy: String) {
          contacts(skip: $skip, first: $first, filter: $filter, orderBy: $orderBy) {
            id
            phone
            name
            pushName
            owner
            createdAt
            subscribed 
            tags
            origin
            agents
            forwardTo
            assignedTo
            pob
            dob
            gender
            subscribed
          }
        }`,
    variables: {
      filter,
      first,
      skip,
      orderBy,
    },
  };

  return axios({
    method: "post",
    url: `${process.env.API_DB_URL}/graphql`,
    headers: {
      "Content-Type": "application/json",
      token,
      key: process.env.DB_DAISI_KEY,
    },
    data: payload,
    skipErrorHandler: true,
    ...(options || {}),
  });
}

async function deleteContact(token, contactId) {
  try {
    const url = `${process.env.API_DB_URL}/api/v1/contact/${contactId}`;
    const response = await axios({
      method: "delete",
      url,
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addContact, getContacts, deleteContact };
