const users = [
    {
      email: "atapas@email.com",
      password: "password"
    },
    {
      email: "alex@email.com",
      password: "password"
    },
    {
      email: "bob@email.com",
      password: "password"
    },
    {
        email: "cpuloi25@gmail.com",
        password: "123"
    }
  ]
  
  export const getUserByEmail = (email) => {
    const found = users.find(user => user.email === email);
    return found;
  }
