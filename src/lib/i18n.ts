import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLng } from "./constants";

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLng,

    resources: {
      en: {
        translation: {
          "msg-login": "Already have an account?",
          "signup-header": "Create an account",
          sub: "Manager",
          "mail-placeholder": "Enter email address",
          "password-placeholder": "Enter password",
          mail: "Email address",
          completed: "Completed",
          appTitle: "Task",
          login: "Login",
          "no-upcoming": "No upcoming todos",
          incomplete: "Incomplete",
          password: "Password",
          deleted: "Deleted",
          "msg-no-account": "Don't yet have an account?",
          "no-completed": "No todos completed yet",
          header: "Todos Done",
          subHeader: "Keep it up",
          "no-archived": "No todos archived yet",
          placeholder: "Write your next task...",
          register: "Register",
          "archive-success": "Todo item archived",
          "add-success": "Todo added successfully",
          error: "Something went wrong",
          "update-success": "Todo updated successfully",
          "complete-success": "Task completed",
          "restore-success": "Item restored as incomplete",
          "logout-success": "Logout success",
          "login-success": "Login successful",
          "register-success": "Registration successful",
          "login-error": "Invalid login credentials",
          "signup-error": "User already exists",
        },
      },
      fr: {
        translation: {
          "msg-login": "Vous avez déjà un compte?",
          "signup-header": "créer un compte",
          sub: "Tâche",
          "mail-placeholder": "Entrer l'adresse e-mail",
          "password-placeholder": "Entrer le mot de passe",
          mail: "Adresse e-mail",
          completed: "Complété",
          appTitle: "Gestionnaire de",
          login: "Se connecter",
          "no-upcoming": "Pas à venir tout le monde",
          incomplete: "Incomplet",
          password: "Mot de passe",
          deleted: "Supprimé",
          "msg-no-account": "Vous n'avez pas encore de compte ?",
          "no-completed": "Aucune tâche terminée pour l'instant",
          header: "Tout le monde fait un don",
          subHeader: "continuez comme ça",
          "no-archived": "Aucune tâche archivée pour le moment",
          placeholder: "Écrivez votre prochaine tâche...",
          register: "Registre",
          "archive-success": "Élément à faire archivé",
          "add-success": "Todo ajouté avec succès",
          error: "Quelque chose s'est mal passé",
          "update-success": "Todo mis à jour avec succès",
          "complete-success": "Tâche terminée",
          "restore-success": "Objet restauré car incomplet",
          "logout-success": "Déconnexion réussie",
          "login-success": "connexion réussie",
          "register-success": "Registración exitosa",
          "login-error": "Credenciales de acceso invalidos",
          "signup-error": "Usuario ya existe",
        },
      },
    },
  });

export default i18n;
