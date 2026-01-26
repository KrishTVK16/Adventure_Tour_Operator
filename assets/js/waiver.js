/**
 * Waiver Signature Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signature-pad');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let writingMode = false;

    // Resize canvas to container
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = 200; // Fixed height
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#000';
    }

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse Events
    canvas.addEventListener('mousedown', handlePointerDown, { passive: false });
    document.addEventListener('mouseup', handlePointerUp, { passive: false });
    canvas.addEventListener('mousemove', handlePointerMove, { passive: false });

    // Touch Events
    canvas.addEventListener('touchstart', handlePointerDown, { passive: false });
    document.addEventListener('touchend', handlePointerUp, { passive: false });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: false });

    function handlePointerDown(e) {
        writingMode = true;
        ctx.beginPath();
        const [x, y] = getTargetPosition(e);
        ctx.moveTo(x, y);
        e.preventDefault();
    }

    function handlePointerUp() {
        writingMode = false;
    }

    function handlePointerMove(e) {
        if (!writingMode) return;
        const [x, y] = getTargetPosition(e);
        ctx.lineTo(x, y);
        ctx.stroke();
        e.preventDefault();
    }

    function getTargetPosition(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        return [
            clientX - rect.left,
            clientY - rect.top
        ];
    }

    // Clear Button
    document.getElementById('clear-signature').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Submit Logic (Mock)
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Waiver signed and Booking Submitted! Redirecting to payment...');
            // Logic to clear and close modal would go here
        });
    }
});
