interface Character {
  name: string,
  clan: string,
  rank: string,
  abilities: string[]
}
// Import data.json
let characters: Array<Character> = JSON.parse(await Deno.readTextFile('./data.json'));

//get all characters
const getCharacters = ({ response }: { response: any }) => {
  response.body = characters;
}

//get a character by name
const getCharacterByname = ({ response, params }: { response: any, params: any }) => {
  const name = params.name;
  const character = characters.filter((character) => character.name.toLowerCase() === name.toLowerCase());
  if (character.length === 0) { response.body = { 'message': 'Not found' }; response.status = 400 }
  else { response.body = character; response.status = 200 }
}

//post/add a character to data.json file
const addCharacter = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body();
  const character: Character = body.value;
  const index = characters.find((x) => x.name.toLowerCase() === character.name.toLowerCase());
  if (!index) {
    characters.push(character);
    await Deno.writeTextFile('./data.json', JSON.stringify(characters));
    response.body = { characterAdded: character };
    response.status = 200;
  }
  else {
    response.body = { "message": "Already exists" }; response.status = 400;
    await Deno.writeTextFile('./data.json', JSON.stringify(characters));
  }
}

//delete  a character (searched by name)
const deleteCharacter = async ({ response, params }: { response: any, params: any }) => {
  const name: string = params.name;
  const initialLength: number = characters.length;
  characters = characters.filter((character) => character.name.toLowerCase() !== name.toLowerCase())
  if (characters.length === initialLength) {
    response.body = { "message": "Invalid name" }; response.status = 400;
  }
  else {
    await Deno.writeTextFile('./data.json', JSON.stringify(characters));
    response.body = { "message": "Deleted Successfully" }; response.status = 200;
    
  }
}

const updateCharacter = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body();
  const character: Character = body.value;

  const initialLength: number = characters.length;
  characters = characters.filter((x) => x.name.toLowerCase() !== character.name.toLowerCase())
  
  if (characters.length === initialLength) {
    response.body = { "message": "Invalid name" }; response.status = 400;
  }
  else {
    characters.push(character);
    await Deno.writeTextFile('./data.json', JSON.stringify(characters));
    response.body = {"message":"Updated Successfully", updatedCharacter: character };
    response.status = 200;
  }
}

export { getCharacters, addCharacter, getCharacterByname, deleteCharacter ,updateCharacter}