# BTC Address Card

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-blue?style=flat-square)](https://www.home-assistant.io/)
[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=flat-square)](https://github.com/hacs/integration)
[![Release](https://img.shields.io/github/v/release/jinx-22/btc-address-card?sort=semver&style=flat-square)](https://github.com/jinx-22/btc-address-card/releases)
[![License](https://img.shields.io/github/license/jinx-22/btc-address-card?style=flat-square)](LICENSE)
[![stars](https://img.shields.io/github/stars/jinx-22/btc-address-card)](https://github.com/jinx-22/btc-address-card/stargazers)
[![Donate Bitcoin](https://img.shields.io/badge/₿-Bitcoin-F7931A?style=flat-square)](#bitcoin)
[![Donate Lightning](https://img.shields.io/badge/⚡-Lightning-FFD700?style=flat-square)](#lightning)

🇩🇪 [**Deutsch**](README_DE.md) · 🇬🇧 **English**

A lightweight Lovelace custom card for Home Assistant that displays the confirmed Bitcoin balance and pending mempool activity of a Bitcoin address.

Designed for use with [**Mempool Watch**](https://github.com/jinx-22/mempool_watch).

---

## Features

- ₿ Confirmed BTC balance
- Pending incoming / outgoing BTC
- Net pending change
- Color-coded pending change
- Unconfirmed transaction count
- Shortened Bitcoin address
- Full address on hover
- Click the card to open the entity more-info dialog
- Visual configuration editor
- Bitcoin address entity picker
- Custom card name
- **Home Assistant Theme selection**
- **Font size: 70–150%**
- Native Home Assistant grid sizing
- Responsive layout
- No external dependencies

<img width="1146" height="656" alt="Unbenannt1" src="https://github.com/user-attachments/assets/8551ced1-ebae-4aeb-80a3-39b295454334" />

---

## Installation

### Easy Installation — Recommended

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=btc-address-card&category=plugin)

Click the button above to install **BTC Address Card** directly through HACS.

### HACS

1. Open **HACS → Frontend**
2. Open the three-dot menu → **Custom repositories**
3. Add:

   https://github.com/jinx-22/btc-address-card

4. Select **Dashboard**
5. Install **BTC Address Card**
6. Reload the Home Assistant frontend

### Manual Installation

Download `btc-address-card.js` from the latest release and copy it to:

`/config/www/btc-address-card/btc-address-card.js`

Then add the resource:

    lovelace:
      resources:
        - url: /local/btc-address-card/btc-address-card.js
          type: module

Reload the Home Assistant frontend.

---

## Configuration

### Minimal

    type: custom:btc-address-card
    entity: sensor.my_btc_address

### Full

    type: custom:btc-address-card
    entity: sensor.my_btc_address
    name: Cold Wallet
    theme: My Theme
    font_size: 110

### Options

| Option | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | string | Yes | — | `custom:btc-address-card` |
| `entity` | string | Yes | — | Bitcoin address sensor |
| `name` | string | No | Entity name | Custom card name |
| `theme` | string | No | HA default | Home Assistant theme |
| `font_size` | number | No | `100` | Font size from 70–150% |

---

## Visual Editor

The card includes an integrated Home Assistant visual configuration editor.

Available options:

- Bitcoin address entity picker
- Custom name
- **Home Assistant Theme selection**
- **Font size slider (70–150%)**

No YAML configuration is required.

---

## Required Sensor Attributes

The selected entity should provide the following attributes:

| Attribute | Description |
|---|---|
| `address` | Bitcoin address |
| `confirmed_balance` | Confirmed BTC balance |
| `pending_incoming` | Pending incoming BTC |
| `pending_outgoing` | Pending outgoing BTC |
| `pending_change` | Net pending BTC change |
| `unconfirmed_count` | Number of unconfirmed transactions |

The card was primarily designed for the Bitcoin address sensors provided by **Mempool Watch**.

---

## Languages

Supported languages:

- 🇬🇧 English
- 🇩🇪 German

The interface automatically follows the language configured in Home Assistant.

---

## Mempool Watch

BTC Address Card was designed for use with:

[**Mempool Watch**](https://github.com/jinx-22/mempool_watch)

---

# 🧡 Support & Donations

## Lightning

<p align="center">
⚡ <b>Lightning Address</b><br><br>
<code>usefulplay52@walletofsatoshi.com</code><br><br>
<img width="320" alt="Wallet of Satoshi" src="https://github.com/user-attachments/assets/65cc18d9-05d1-4a00-8ccc-9922fdb54baf" />
</p>

## Bitcoin

<div align="center">
<img src="https://github.com/user-attachments/assets/f74cad36-8c05-4a33-89cd-b998075af33b" /><br><br>
<code>bc1qkz7mtp23cmshxnru96lzgeayu0urlysvqk5vry</code><br><br>
<img alt="Bitcoin Donations" src="https://github.com/user-attachments/assets/196f68e4-b0e8-4f27-bded-8c4fe13b9d45" />
</div>

Thank you for your support! ❤️

[![stars](https://img.shields.io/github/stars/jinx-22/btc-address-card)](https://github.com/jinx-22/btc-address-card/stargazers)

---

## License

MIT — see [LICENSE](LICENSE)

---

## Credits

Designed for Home Assistant and optimized for Bitcoin address sensors provided by Mempool Watch.
