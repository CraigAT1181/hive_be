const { getToken } = require("./getToken");

async function testToken() {
  try {
    console.log("Attempting to get token...");
    const token = await getToken("craigtipple81@gmail.com", "shapeShifter81");
    console.log("Token:", token);
  } catch (error) {
    console.error("Error getting token:", error);
  }
}

testToken();
