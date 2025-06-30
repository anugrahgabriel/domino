"use strict";
class DominoWindow {
    constructor() {
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.handleMouseMove = (e) => {
            if (!this.isDragging)
                return;
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
        this.handleMouseUp = () => {
            this.isDragging = false;
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
        };
        this.window = document.getElementById('domino-window');
        this.closeBtn = document.getElementById('close-btn');
        if (this.window && this.closeBtn) {
            this.initializeDragBehavior();
            this.initializeCloseButton();
        }
    }
    initializeDragBehavior() {
        const titleBar = this.window.querySelector('.title-bar');
        titleBar.addEventListener('mousedown', (e) => {
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
    initializeCloseButton() {
        this.closeBtn.addEventListener('click', () => {
            this.window.style.display = 'none';
        });
    }
    show() {
        this.window.style.display = 'flex';
    }
    hide() {
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
