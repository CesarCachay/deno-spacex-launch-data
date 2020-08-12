const example = {
  name: 'Elon Musk',
  job: 'billionare'
};

const postNewUser = async (body: any) => {

  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const newUser = await response.json()
    .then(user => console.log(user));

  return newUser;
}

console.log(postNewUser(example));
// run with => deno run --allow-net createUser.ts