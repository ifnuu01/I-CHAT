export default function formatTime (timeString: string) {
    if (!timeString) return '';
    
    try {
        const date = new Date(timeString);
        const now = new Date();
        
        const isSameDay = date.toDateString() === now.toDateString();
        
        if (isSameDay) {
            return date.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } else {
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (date.toDateString() === yesterday.toDateString()) {
                return 'Kemarin';
            } else {
                return date.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: '2-digit'
                });
            }
        }
    } catch (error) {
        return '';
    }
};