function updateTimer() {
    const now = new Date();
    const today = new Date();
    const targetTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30, 0);
    
    // Se já passou das 12:30 de hoje, definir para amanhã
    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }
    
    const timeDiff = targetTime - now;
    
    // Atualizar hora atual
    document.getElementById('currentTime').textContent = now.toLocaleTimeString('pt-BR');
    
    if (timeDiff <= 0) {
        // Chegou a hora!
        document.getElementById('timeDisplay').textContent = "00:00:00";
        document.getElementById('status').textContent = "🎉 A fava chegou! Bom almoço! 🎉";
        document.getElementById('status').className = "status ready";
        document.getElementById('progressFill').style.width = "100%";
        
        // Mudar o ícone para celebração
        document.querySelector('.food-icon').textContent = "🎉";
        
        return;
    }
    
    // Calcular horas, minutos e segundos restantes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Formatar com zeros à esquerda
    const formattedTime = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    
    document.getElementById('timeDisplay').textContent = formattedTime;
    
    // Atualizar status
    const totalMinutesLeft = hours * 60 + minutes;
    let statusText = "";
    
    if (totalMinutesLeft > 60) {
        statusText = `Ainda faltam ${Math.floor(totalMinutesLeft/60)}h ${totalMinutesLeft%60}min para a fava!`;
    } else if (totalMinutesLeft > 30) {
        statusText = `Faltam ${totalMinutesLeft} minutos! Quase na hora! 🕐`;
    } else if (totalMinutesLeft > 10) {
        statusText = `Só ${totalMinutesLeft} minutos! Preparando a mesa! 🍴`;
    } else if (totalMinutesLeft > 5) {
        statusText = `${totalMinutesLeft} minutos! A fava está chegando! 🚗💨`;
    } else {
        statusText = `Últimos ${totalMinutesLeft} minutos! Pronto para almoçar! 🤤`;
    }
    
    document.getElementById('status').textContent = statusText;
    document.getElementById('status').className = "status waiting";
    
    // Calcular progresso (assumindo que começamos a contar 4 horas antes)
    const fourHours = 4 * 60 * 60 * 1000; // 4 horas em millisegundos
    const progress = Math.max(0, Math.min(100, ((fourHours - timeDiff) / fourHours) * 100));
    document.getElementById('progressFill').style.width = progress + "%";
}

// Atualizar a cada segundo
updateTimer();
setInterval(updateTimer, 1000);

// Efeito sonoro quando chegar a hora (opcional)
let alerted = false;
function checkAlert() {
    const now = new Date();
    const today = new Date();
    const targetTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30, 0);
    
    if (now >= targetTime && !alerted) {
        alerted = true;
        // Você pode adicionar um som aqui se quiser
        console.log("🎉 A fava chegou!");
    }
}

setInterval(checkAlert, 1000);