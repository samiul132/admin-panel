document.addEventListener('DOMContentLoaded', () => {
    // 1️⃣ Basic message
    document.querySelector('#basic-message')?.addEventListener('click', () => {
        Swal.fire('Hello! This is a basic alert.');
    });

    // 2️⃣ Title with text
    document.querySelector('#title-text')?.addEventListener('click', () => {
        Swal.fire('Here is a title', 'And here is some descriptive text.');
    });

    // 3️⃣ Success message
    document.querySelector('#success-message')?.addEventListener('click', () => {
        Swal.fire('Good job!', 'You clicked the button!', 'success');
    });

    // 4️⃣ Modal with long content
    document.querySelector('#long-content')?.addEventListener('click', () => {
        Swal.fire({
            title: 'Long Content Modal',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            icon: 'info',
            width: 600,
            padding: '3em',
        });
    });

    // 5️⃣ Custom positioned dialog
    document.querySelector('#custom-position')?.addEventListener('click', () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Positioned Alert',
            showConfirmButton: false,
            timer: 1500
        });
    });

    // 6️⃣ Error modal with footer
    document.querySelector('#error-footer')?.addEventListener('click', () => {
        Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong!',
            icon: 'error',
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    });

    // 7️⃣ Confirm dialog
    document.querySelector('#confirm-dialog')?.addEventListener('click', () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your file is safe :)', 'info');
            }
        });
    });

    // 8️⃣ Custom image header
    document.querySelector('#custom-image')?.addEventListener('click', () => {
        Swal.fire({
            title: 'Custom Image',
            text: 'Here is a cool image!',
            imageUrl: 'assets/images/profile.jpg',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom image',
        });
    });

    // 9️⃣ Auto close timer
    document.querySelector('#auto-close')?.addEventListener('click', () => {
        let timerInterval;
        Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                const b = Swal.getHtmlContainer().querySelector('b');
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        });
    });

    // 🔟 Custom HTML and buttons
    document.querySelector('#custom-html')?.addEventListener('click', () => {
        Swal.fire({
            title: '<strong>Custom <u>HTML</u> Alert</strong>',
            icon: 'info',
            html: 'You can use <b>HTML</b> tags here',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>'
        });
    });

    // 11️⃣ Ajax request example
    document.querySelector('#ajax-request')?.addEventListener('click', () => {
        Swal.fire({
            title: 'Submit email to run AJAX request',
            input: 'email',
            inputLabel: 'Your email address',
            inputPlaceholder: 'Enter your email',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                Swal.fire(`Entered email: ${result.value}`);
            }
        });
    });

    // 12️⃣ Queue Example (Chaining Modals)
    document.querySelector('#queue-example')?.addEventListener('click', () => {
        const steps = [
            { title: 'Step 1', text: 'This is step 1' },
            { title: 'Step 2', text: 'This is step 2' },
            { title: 'Step 3', text: 'This is step 3' }
        ];

        let currentStep = 0;

        const showNext = () => {
            if (currentStep < steps.length) {
                Swal.fire({
                    title: steps[currentStep].title,
                    text: steps[currentStep].text,
                    confirmButtonText: 'Next →',
                    allowOutsideClick: false
                }).then(() => {
                    currentStep++;
                    showNext();
                });
            } else {
                Swal.fire({
                    title: 'All done!',
                    html: `Steps completed: ${steps.map(s => s.title).join(', ')}`,
                    confirmButtonText: 'Nice!'
                });
            }
        };

        showNext();
    });

    // 13️⃣ Dynamic Queue Example
    document.querySelector('#dynamic-queue')?.addEventListener('click', () => {
        const questions = [
            { title: 'Question 1', text: 'Answer something for question 1', input: 'text' },
            { title: 'Question 2', text: 'Answer something for question 2', input: 'text' },
            { title: 'Question 3', text: 'Answer something for question 3', input: 'text' }
        ];

        let answers = [];
        let currentQuestion = 0;

        const askNext = () => {
            if (currentQuestion < questions.length) {
                Swal.fire({
                    title: questions[currentQuestion].title,
                    text: questions[currentQuestion].text,
                    input: questions[currentQuestion].input,
                    showCancelButton: true,
                    confirmButtonText: 'Next →'
                }).then((result) => {
                    if (result.isConfirmed) {
                        answers.push(result.value);
                        currentQuestion++;
                        askNext();
                    }
                });
            } else {
                Swal.fire({
                    title: 'All answered!',
                    html: `Your answers: <pre>${JSON.stringify(answers, null, 2)}</pre>`
                });
            }
        };

        askNext();
    });
});
