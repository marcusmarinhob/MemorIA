import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase.js";


export async function salvarDadosUsuario(uid, userData) {
  try {
    const dadosCompletos = {
      ...userData,
      materia: userData.materia || null,
      ativo: true,
      createdAt: serverTimestamp(),
      ultimoAcesso: serverTimestamp(),
    };

    await setDoc(doc(db, "users", uid), dadosCompletos);

    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar dados do usuário:", error);
    return {
      success: false,
      error: "Erro ao salvar dados do usuário",
    };
  }
}

export async function buscarDadosUsuario(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
      return { success: false, error: "Usuário não encontrado" };
    }

    return {
      success: true,
      data: { id: userDoc.id, ...userDoc.data() },
    };
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return {
      success: false,
      error: "Erro ao buscar dados do usuário",
    };
  }
}

export async function verificarTipoUsuario(uid, tipoEsperado) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
      return { success: false, error: "Usuário não encontrado" };
    }

    const userData = userDoc.data();

    if (userData.tipo !== tipoEsperado) {
      return {
        success: false,
        error: `Acesso negado! Este email é de um ${userData.tipo}`,
      };
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error("Erro ao verificar tipo:", error);
    return { success: false, error: "Erro ao verificar tipo de usuário" };
  }
}

export async function buscarUsuariosPorTipo(tipo) {
  try {
    const q = query(
      collection(db, "users"),
      where("tipo", "==", tipo),
      where("ativo", "==", true)
    );

    const querySnapshot = await getDocs(q);
    const usuarios = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, data: usuarios };
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return { success: false, error: "Erro ao buscar usuários" };
  }
}

export async function atualizarDadosUsuario(uid, novosDados) {
  try {
    await updateDoc(doc(db, "users", uid), {
      ...novosDados,
      atualizadoEm: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { success: false, error: "Erro ao atualizar dados" };
  }
}
