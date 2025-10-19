import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.js";
import {doc, getDoc, setDoc} from "firebase/firestore"
import { db } from "./firebase.js";


export const USER_TYPES = {
  PROFESSOR: "professor",
  ALUNO: "aluno",
  RESPONSAVEL: "responsavel",
};

export async function cadastrarUsuario(
  email,
  senha,
  tipoUsuario,
  nome,
  materia
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: email,
      tipo: tipoUsuario,
      nome: nome,
      materia: materia || null,
      ativo: true,
      createdAt: new Date(),
    });

    if (tipoUsuario === USER_TYPES.PROFESSOR) {
      await updateProfile(user, { displayName: nome });
    }

    return {
      success: true,
      user: user,
      tipo: tipoUsuario,
      nome: nome,
      materia: materia,
      email: email,
    };
  } catch (error) {
    let mensagemErro = "Erro ao cadastrar";

    if (error.code === "auth/email-already-in-use") {
      mensagemErro = "Este email já está em uso";
    } else if (error.code === "auth/weak-password") {
      mensagemErro = "Senha muito fraca (mínimo 6 caracteres)";
    } else if (error.code === "auth/invalid-email") {
      mensagemErro = "Email inválido";
    }

    return {
      success: false,
      error: mensagemErro,
      code: error.code,
    };
  }
}

export async function loginUsuario(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    return {
      success: true,
      user: user,
      role: userData.tipo,
      nome: userData.nome,
      tipo: userData.tipo
    };
  } catch (error) {
    let mensagemErro = "Erro ao fazer login";

    if (error.code === "auth/user-not-found") {
      mensagemErro = "Usuário não encontrado";
    } else if (error.code === "auth/wrong-password") {
      mensagemErro = "Senha incorreta";
    } else if (error.code === "auth/invalid-email") {
      mensagemErro = "Email inválido";
    }

    return {
      success: false,
      error: mensagemErro,
      code: error.code,
    };
  }
}

export async function logoutUsuario() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export function getUsuarioAtual() {
  return auth.currentUser;
}

export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}
