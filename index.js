const xlsx = require("xlsx");
const { addContact, getContacts } = require("./services/ContactController");

const t = "dcdf26cef7248a1f200140e8329f8a242ce777f0e54246089b913d199605aad5b7";
const s = "02SERVER";
const p = "dummy.xlsx";

const addBulkContact = (token, sender, path) => {
  // Load the XLSX file
  const workbook = xlsx.readFile(path);

  // Specify the sheet you want to convert to JSON
  const sheetName = "Sheet1"; // Change this to the name of your sheet

  // Convert the sheet to JSON
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const payload = {
    owner: sender,
    keepAssignedTo: false,
    keepTags: "REPLACE",
    keepOrigin: true,
    items: sheetData.map((el) => {
      return {
        name: el["Full Name"],
        phone: `${el.Column1}`,
        tags: el.Tag,
        counter: 0,
        assignedTo: "User2",
        gender: "MALE",
        origin: "dir",
        pushName: el["Full Name"],
        types: "PERSONAL",
        agents: ["WA"],
      };
    }),
  };
  addContact(token, payload);
};

const editContact = async (sender, token) => {
  try {
    const id = "d3ab8f2347";
    const phone = "6281293454217";
    const { data } = await getContacts({
      filter: { phone },
      token,
    });
    console.log(data.data.contacts);
  } catch (error) {
    console.log(error);
  }
};

editContact(s, t);
