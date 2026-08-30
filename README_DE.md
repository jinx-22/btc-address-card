# BTC Address Card

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-blue?style=flat-square)](https://www.home-assistant.io/)
[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=flat-square)](https://github.com/hacs/integration)
[![Release](https://img.shields.io/github/v/release/jinx-22/btc-address-card?sort=semver&style=flat-square)](https://github.com/jinx-22/btc-address-card/releases)
[![License](https://img.shields.io/github/license/jinx-22/btc-address-card?style=flat-square)](LICENSE)
[![stars](https://img.shields.io/github/stars/jinx-22/btc-address-card)](https://github.com/jinx-22/btc-address-card/stargazers)
[![Donate Bitcoin](https://img.shields.io/badge/₿-Bitcoin-F7931A?style=flat-square)](#bitcoin)
[![Donate Lightning](https://img.shields.io/badge/⚡-Lightning-FFD700?style=flat-square)](#lightning)

🇩🇪 **Deutsch** · 🇬🇧 [**English**](README.md)

Eine schlanke Lovelace Custom Card für Home Assistant, die den bestätigten Bitcoin-Saldo sowie ausstehende Mempool-Aktivitäten einer Bitcoin-Adresse anzeigt.

Entwickelt für die Verwendung mit [**Mempool Watch**](https://github.com/jinx-22/mempool_watch).

---

## Funktionen

- ₿ Bestätigter BTC-Saldo
- Ausstehende eingehende / ausgehende BTC
- Nettoänderung der ausstehenden Beträge
- Farblich hervorgehobene positive / negative Änderungen
- Anzahl unbestätigter Transaktionen
- Gekürzte Bitcoin-Adresse
- Vollständige Adresse beim Überfahren mit der Maus
- Klick auf die Karte öffnet den More-Info-Dialog der Entität
- Visueller Konfigurationseditor
- Auswahl der Bitcoin-Adress-Entität
- Eigener Kartenname
- **Auswahl eines Home-Assistant-Themes**
- **Schriftgröße: 70–150 %**
- Native Home-Assistant-Grid-Größenanpassung
- Responsives Layout
- Keine externen Abhängigkeiten

<img width="1146" height="656" alt="Unbenannt1" src="https://github.com/user-attachments/assets/8551ced1-ebae-4aeb-80a3-39b295454334" />

---

## Installation

### Einfache Installation — Empfohlen

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=btc-address-card&category=plugin)

Klicke auf den Button oben, um **BTC Address Card** direkt über HACS zu installieren.

### HACS

1. Öffne **HACS → Frontend**
2. Öffne das Drei-Punkte-Menü → **Benutzerdefinierte Repositories**
3. Füge hinzu:

   https://github.com/jinx-22/btc-address-card

4. Wähle **Dashboard**
5. Installiere **BTC Address Card**
6. Lade das Home-Assistant-Frontend neu

### Manuelle Installation

Lade `btc-address-card.js` aus dem neuesten Release herunter und kopiere die Datei nach:

`/config/www/btc-address-card/btc-address-card.js`

Füge anschließend die Ressource hinzu:

    lovelace:
      resources:
        - url: /local/btc-address-card/btc-address-card.js
          type: module

Lade das Home-Assistant-Frontend anschließend neu.

---

## Konfiguration

### Minimal

    type: custom:btc-address-card
    entity: sensor.my_btc_address

### Vollständig

    type: custom:btc-address-card
    entity: sensor.my_btc_address
    name: Cold Wallet
    theme: My Theme
    font_size: 110

### Optionen

| Option | Typ | Erforderlich | Standard | Beschreibung |
|---|---|---|---|---|
| `type` | string | Ja | — | `custom:btc-address-card` |
| `entity` | string | Ja | — | Bitcoin-Adresssensor |
| `name` | string | Nein | Entitätsname | Eigener Kartenname |
| `theme` | string | Nein | HA-Standard | Home-Assistant-Theme |
| `font_size` | number | Nein | `100` | Schriftgröße von 70–150 % |

---

## Visueller Editor

Die Karte verfügt über einen integrierten visuellen Home-Assistant-Konfigurationseditor.

Verfügbare Optionen:

- Auswahl der Bitcoin-Adress-Entität
- Eigener Name
- **Home-Assistant-Theme-Auswahl**
- **Schriftgrößenregler (70–150 %)**

Eine YAML-Konfiguration ist dafür nicht erforderlich.

---

## Benötigte Sensor-Attribute

Die ausgewählte Entität sollte folgende Attribute bereitstellen:

| Attribut | Beschreibung |
|---|---|
| `address` | Bitcoin-Adresse |
| `confirmed_balance` | Bestätigter BTC-Saldo |
| `pending_incoming` | Ausstehende eingehende BTC |
| `pending_outgoing` | Ausstehende ausgehende BTC |
| `pending_change` | Nettoänderung der ausstehenden BTC |
| `unconfirmed_count` | Anzahl unbestätigter Transaktionen |

Die Karte wurde hauptsächlich für die Bitcoin-Adresssensoren von **Mempool Watch** entwickelt.

---

## Sprachen

Unterstützte Sprachen:

- 🇬🇧 Englisch
- 🇩🇪 Deutsch

Die Benutzeroberfläche folgt automatisch der in Home Assistant eingestellten Sprache.

---

## Mempool Watch

Die BTC Address Card wurde für die Verwendung mit:

[**Mempool Watch**](https://github.com/jinx-22/mempool_watch)

entwickelt.

---

# 🧡 Support & Spenden

## Lightning

<p align="center">
⚡ <b>Lightning-Adresse</b><br><br>
<code>usefulplay52@walletofsatoshi.com</code><br><br>
<img width="320" alt="Wallet of Satoshi" src="https://github.com/user-attachments/assets/65cc18d9-05d1-4a00-8ccc-9922fdb54baf" />
</p>

## Bitcoin

<div align="center">
<img src="https://github.com/user-attachments/assets/f74cad36-8c05-4a33-89cd-b998075af33b" /><br><br>
<code>bc1qkz7mtp23cmshxnru96lzgeayu0urlysvqk5vry</code><br><br>
<img alt="Bitcoin-Spenden" src="https://github.com/user-attachments/assets/196f68e4-b0e8-4f27-bded-8c4fe13b9d45" />
</div>

Vielen Dank für deine Unterstützung! ❤️

[![GitHub Stars](https://img.shields.io/github/stars/jinx-22/btc-address-card?style=social)](https://github.com/jinx-22/btc-address-card/stargazers)

---

## Lizenz

MIT – siehe [LICENSE](LICENSE)

---

## Credits

Entwickelt für Home Assistant und optimiert für Bitcoin-Adresssensoren von Mempool Watch.
