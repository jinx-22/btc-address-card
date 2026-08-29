# BTC Address Card

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-blue?style=flat-square)](https://www.home-assistant.io/)
[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=flat-square)](https://github.com/hacs/integration)
[![Release](https://img.shields.io/github/v/release/jinx-22/btc-address-card?sort=semver&style=flat-square)](https://github.com/jinx-22/btc-address-card/releases)
[![License](https://img.shields.io/github/license/jinx-22/btc-address-card?style=flat-square)](LICENSE)
[![stars](https://img.shields.io/github/stars/jinx-22/btc-address-card)](https://github.com/jinx-22/btc-address-card/stargazers)
[![Donate Bitcoin](https://img.shields.io/badge/₿-Bitcoin-F7931A?style=flat-square)](#bitcoin)
[![Donate Lightning](https://img.shields.io/badge/⚡-Lightning-FFD700?style=flat-square)](#lightning)

🇩🇪 [**Deutsch**](README_DE.md) · 🇬🇧 **English**

A Lovelace custom card for Home Assistant that displays the confirmed balance and pending (mempool) incoming/outgoing amounts of a Bitcoin address.

Designed for use with **Mempool Watch** (or any sensor that exposes the required attributes).

---

## Features

- Confirmed balance (large, easy to read)
- Pending incoming / pending outgoing
- Net pending change (color-coded: green / red)
- Unconfirmed transaction count badge
- Shortened address with full address on hover
- Optional custom card background color + opacity
- Visual editor (entity picker, color picker, opacity slider)
- German / English UI (follows Home Assistant language)
- Click opens the more-info dialog of the entity

---

## Requirements

This card expects a sensor entity with at least these attributes:

| Attribute            | Description                          |
|----------------------|--------------------------------------|
| `address`            | The Bitcoin address                  |
| `unconfirmed_count`  | Number of unconfirmed transactions   |
| `pending_incoming`   | Pending incoming amount (BTC)        |
| `pending_outgoing`   | Pending outgoing amount (BTC)        |
| `pending_change`     | Net pending change (BTC)             |
| `confirmed_balance`  | Confirmed balance (optional, falls back to state) |

The **state** of the entity should be the current (usually confirmed) balance.

These attributes are typically provided by the [Mempool Watch](https://github.com/) integration / sensors.

---

## Installation

### Easy installation -> [![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=btc-address-card&category=plugin)

### HACS (recommended)

1. Open **HACS** → **Frontend** (Dashboard)
2. Click the three-dot menu → **Custom repositories**
3. Add the repository URL of this GitHub repo
4. Category: **Dashboard** (or Lovelace / Plugin)
5. Click **Download** / **Install**
6. Reload the frontend (or clear browser cache)

After installation the resource is registered automatically in most setups.

### Manual installation

1. Download `btc-address-card.js` from the latest release (or from the repository root)
2. Copy it to `/config/www/btc-address-card/btc-address-card.js`  
   (or any path under `/config/www/`)
3. Add a Lovelace resource:

   **UI method**  
   Settings → Dashboards → ⋮ → Resources → Add Resource  
   - URL: `/local/btc-address-card/btc-address-card.js`  
   - Type: **JavaScript Module**

   **YAML method**
   ```yaml
   lovelace:
     resources:
       - url: /local/btc-address-card/btc-address-card.js
         type: module
   ```

4. Restart Home Assistant or reload resources and clear browser cache.

---

## Configuration

### Minimal example

```yaml
type: custom:btc-address-card
entity: sensor.my_btc_address
```

### Full example

```yaml
type: custom:btc-address-card
entity: sensor.my_btc_address
name: Cold Wallet
card_color: [30, 136, 229]   # RGB
card_opacity: 85             # 0–100
```

### Options

| Name           | Type     | Required | Default              | Description                                      |
|----------------|----------|----------|----------------------|--------------------------------------------------|
| `type`         | string   | **yes**  | –                    | `custom:btc-address-card`                        |
| `entity`       | string   | **yes**  | –                    | Sensor entity that provides the BTC address data |
| `name`         | string   | no       | Entity friendly name | Custom title shown on the card                   |
| `card_color`   | list[int]| no       | Theme background     | RGB color for the card background `[R, G, B]`    |
| `card_opacity` | number   | no       | `100`                | Opacity of the background color (0–100)          |

---

## Visual Editor

The card ships with a full visual configuration editor:

- Entity picker (only shows compatible BTC-address sensors)
- RGB color selector
- Opacity slider (0–100)

You can configure everything without writing YAML.

---

## Screenshot / Preview

The card appears in the Lovelace card picker under **BTC Address Card**.

It shows:

- Title + shortened address
- Unconfirmed TX badge (highlighted when > 0)
- Large confirmed balance
- Four detail fields: Pending in / Pending out / Net pending / Confirmed

---

## Version

Current version: **1.0.0**

After loading the card you should see a console message:
`BTC Address Card v1.0.0`

> **Note:** Replace `YOUR_USERNAME` in `documentationURL` inside `btc-address-card.js` with your real GitHub username/repo after publishing.

---

# 🧡 Support & Donations

## Lightning

<p align="center">
⚡ <b>Address:</b><br><br>
<code>usefulplay52@walletofsatoshi.com</code><br><br>
<img width="320" alt="Self_Wallet of Satoshi" src="https://github.com/user-attachments/assets/65cc18d9-05d1-4a00-8ccc-9922fdb54baf" />
</p>

## Bitcoin

<div align="center">
<img src="https://github.com/user-attachments/assets/f74cad36-8c05-4a33-89cd-b998075af33b" /><br><br>
<code>bc1qkz7mtp23cmshxnru96lzgeayu0urlysvqk5vry</code><br><br>
<img alt="Donations_240px" src="https://github.com/user-attachments/assets/196f68e4-b0e8-4f27-bded-8c4fe13b9d45" />
</div>

Thanks for your support — and a free ⭐ helps others find the project:  
[![GitHub stars](https://img.shields.io/github/stars/jinx-22/mempool_watch?style=social)](https://github.com/jinx-22/mempool_watch/stargazers)

---

## License

MIT – see [LICENSE](LICENSE)

---

## Credits

Inspired by common Home Assistant custom-card patterns and designed for Mempool Watch style sensors.
