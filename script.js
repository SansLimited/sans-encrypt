function scrollToGame(gameId) {
    const element = document.getElementById(gameId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
