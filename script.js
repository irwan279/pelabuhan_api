document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country');
    const portSelect = document.getElementById('port');
    const customsDutyInput = document.getElementById('customs-duty');

    function populateCountries() {
        fetch('https://insw-dev.ilcs.co.id/n/negara?ur_negara')
            .then(response => response.json())
            .then(data => {
                data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.id;
                    option.textContent = country.name;
                    countrySelect.appendChild(option);
                });
            });
    }


    function populatePorts(countryId) {

        fetch(`https://insw-dev.ilcs.co.id/n/pelabuhan${countryId}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(port => {
                    const option = document.createElement('option');
                    option.value = port.id;
                    option.textContent = port.name;
                    portSelect.appendChild(option);
                });
            });
    }

    countrySelect.addEventListener('change', function () {
        const selectedCountryId = this.value;
        if (selectedCountryId) {
            populatePorts(selectedCountryId);
        }
    });

    // Event listener untuk submit form
    document.getElementById('shipping-form').addEventListener('submit', function (e) {

        fetch(`https://insw-dev.ilcs.co.id/n/tarif?hs_code=10079000${selectedPortId}&price=${document.getElementById('price').value}`)
            .then(response => response.json())
            .then(data => {
                customsDutyInput.value = data.duty;
            })
            .catch(error => {
                console.error(error);
                alert('Terjadi kesalahan saat menghitung tarif bea masuk.');
            });
    });

});
