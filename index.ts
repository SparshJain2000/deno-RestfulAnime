import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { getCharacters, addCharacter, getCharacterByname, deleteCharacter,updateCharacter } from "./controller.ts";
//server
const app = new Application();
const router = new Router();
const PORT = 8000;
router
  .get('/', getCharacters)
  .get('/:name', getCharacterByname)
  .delete('/:name', deleteCharacter)
  .put('/:name',updateCharacter)
  .post('/add', addCharacter);
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: PORT });