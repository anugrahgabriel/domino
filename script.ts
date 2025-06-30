interface Position {
    x: number;
    y: number;
}

class DominoWindow {
    private window: HTMLElement;
    private isDragging: boolean = false;
    private dragOffset: Position = { x: 0, y: 0 };
    private closeBtn: HTMLElement;

    constructor() {
        this.window = document.getElementById('domino-window') as HTMLElement;
        this.closeBtn = document.getElementById('close-btn') as HTMLElement;
        
        if (this.window && this.closeBtn) {
            this.initializeDragBehavior();
            this.initializeCloseButton();
        }
    }

    private initializeDragBehavior(): void {
        const titleBar = this.window.querySelector('.title-bar') as HTMLElement;
        
        titleBar.addEventListener('mousedown', (e: MouseEvent) => {
            this.isDragging = true;
            const rect = this.window.getBoundingClientRect();
            this.dragOffset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            
            e.preventDefault();
        });
    }

    private handleMouseMove = (e: MouseEvent): void => {
        if (!this.isDragging) return;
        
        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;
        
        // Constrain to viewport
        const maxX = window.innerWidth - this.window.offsetWidth;
        const maxY = window.innerHeight - this.window.offsetHeight;
        
        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));
        
        this.window.style.left = `${constrainedX}px`;
        this.window.style.top = `${constrainedY}px`;
    };

    private handleMouseUp = (): void => {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    };

    private initializeCloseButton(): void {
        this.closeBtn.addEventListener('click', () => {
            this.window.style.display = 'none';
        });
    }

    public show(): void {
        this.window.style.display = 'flex';
    }

    public hide(): void {
        this.window.style.display = 'none';
    }
}

// Initialize the window when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dominoWindow = new DominoWindow();
    
    // You can control the window programmatically:
    // dominoWindow.show();
    // dominoWindow.hide();
}); 