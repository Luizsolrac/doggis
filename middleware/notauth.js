export default function({ store, redirect }) {
  if (store.state.usuarioLogado !== null) {
    return redirect("/");
  }
}
