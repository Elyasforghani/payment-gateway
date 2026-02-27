
        const clean = (val) => val.replace(/\D/g, '');
        const cardContainer = document.querySelector('.container');
        const inp = document.querySelectorAll('.card>input');
        const dispnum = document.querySelectorAll('.container>.front>span');
        const expD = document.getElementById('expiray');
        const expInp = document.getElementById('expInp');
        const cv = document.getElementById('dispCVV');
        const cvInp = document.getElementById('cvv2');
        const btn = document.getElementById('btn');

        inp.forEach((val, i) => {
            val.addEventListener('input', () => {
                val.value = clean(val.value);
                dispnum[i].innerText = clean(val.value) || '****';
                if (val.value.length >= 4 && i < 3) {
                    val.nextElementSibling.focus();
                } else if (val.value.length >= 4 && i == 3) {
                    expInp.focus();
                }
            })
            // Backspace Focus Backward
            val.addEventListener('keydown', (e) => {
                if (e.key === "Backspace" && val.value.length === 0 && i > 0) {
                    val.parentElement.children[i - 1].focus();
                }
            });
        })

        expInp.addEventListener('input', (e) => {
            let val = clean(e.target.value);
            if (val.length >= 2) {
                val = val.substring(0, 2) + '/' + val.substring(2, 4);
            }
            e.target.value = val;
            expD.innerText = val || "MM/YY";
            if (val.length === 5) {
                cvInp.focus();
            }
        })

        cvInp.addEventListener('focus', () => {
            cardContainer.classList.add('flipped');
        });

        // Flip back to front when user leaves the CVV field
        cvInp.addEventListener('blur', () => {
            cardContainer.classList.remove('flipped');
        });

        cvInp.addEventListener('input', (e) => {
            e.target.value = clean(e.target.value);
            cv.innerText = e.target.value || "***";
        });

        cvInp.addEventListener('keydown', (e) => {
            if (e.key === "Backspace" && cvInp.value.length === 0) {
                expInp.focus();
            }
        });

        btn.addEventListener('click', () => {
            btn.style.background = '#28a745'; // Green success background
            btn.style.color = '#fff';
            btn.innerText = "Done!";
            btn.style.boxShadow = "0 0 20px rgba(40, 167, 69, 0.6)";
            btn.style.border = "none";
        });
    