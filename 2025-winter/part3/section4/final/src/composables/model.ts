export function openModal(modalId: string) {
  const modal = document.getElementById(modalId) as any;
  modal.showModal();
}

export function closeModal(modalId: string) {
  const modal = document.getElementById(modalId) as any;
  modal.close();
}
