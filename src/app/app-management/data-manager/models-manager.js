//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

//your app-wide models here

import {v1 as uuidv1} from 'uuid';

export function User() {
  this.model = {
    id: uuidv1(),
    name: null,
    usernameOrEmail: null,
    password: null,
  }
  return this.model;
}
