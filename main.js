import './style.css';
import countries from './countries.json';
import timezones from './timezones.json';

const form = document.querySelector('form');
const select = document.querySelector('select');
const input = document.querySelector('[name="phone-number"');
const twitterShare = document.querySelector('#twitter-share');
const facebookShare = document.querySelector('#facebook-share');

function setCountryCodeByTimezone() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone === '' || !timezone) return;

    if (timezones[timezone] === undefined) return;

    const countryCode = timezones[timezone].c[0];

    for (let option of select.options) {
      if (option.getAttribute('data-country-code') === countryCode) {
        option.selected = true;
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

countries
  .sort((a, b) => a.code > b.code)
  .forEach((country) => {
    const option = document.createElement('option');
    option.value = country.dial_code;

    option.textContent = `${country.flag} ${country.code} (${country.dial_code})`;
    option.setAttribute('data-country-code', country.code);
    option.setAttribute('data-country-name', country.name);
    option.setAttribute('data-country-dial-code', country.dial_code);
    option.setAttribute('data-country-flag', country.flag);

    select.appendChild(option);
  });

input.addEventListener('focus', () => {
  gtag('event', 'input_focus');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  gtag('event', 'form_submit');

  // Replaces ( ) - and spaces with empty string
  const phoneNumber = `${input.value}`.replace(/\(|\)|\-| /g, '');
  const countryCode = select.value;

  window.location.assign(`https://wa.me/${countryCode + phoneNumber}`);
});

twitterShare.addEventListener('click', () => {
  gtag('event', 'twitter_share');
});

facebookShare.addEventListener('click', () => {
  gtag('event', 'facebook_share');
});

setCountryCodeByTimezone();
