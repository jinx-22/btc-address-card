# BTC Address Card

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2023.4%2B-blue.svg)](https://www.home-assistant.io/)

A Lovelace custom card for Home Assistant that displays the confirmed balance and pending (mempool) incoming/outgoing amounts of a Bitcoin address.

Designed for use with **Mempool Watch** (or any sensor that exposes the required attributes).

**Deutsch?** → [README_de.md](README_de.md)

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

## Development & Contributing

The card is written in plain vanilla JavaScript (no build step required).

To contribute:

1. Fork the repository
2. Make your changes to `btc-address-card.js`
3. Test in Home Assistant (add as local resource)
4. Open a Pull Request

---

## License

MIT – see [LICENSE](LICENSE)

---

## Credits

Inspired by common Home Assistant custom-card patterns and designed for Mempool Watch style sensors.
