# BTC Address Card

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2023.4%2B-blue.svg)](https://www.home-assistant.io/)

Eine Lovelace-Custom-Card für Home Assistant, die den bestätigten Saldo sowie unbestätigte (Mempool) Ein- und Ausgänge einer Bitcoin-Adresse anzeigt.

Optimiert für **Mempool Watch** (oder jeden Sensor, der die benötigten Attribute bereitstellt).

**English?** → [README.md](README.md)

---

## Funktionen

- Bestätigter Saldo (groß und gut lesbar)
- Unbestätigter Eingang / unbestätigter Ausgang
- Netto-Pending-Änderung (farbcodiert: grün / rot)
- Badge mit Anzahl unbestätigter Transaktionen
- Gekürzte Adresse, vollständige Adresse beim Hover
- Optionale Kartenfarbe + Transparenz
- Visueller Editor (Entity-Picker, Farbwähler, Opacity-Slider)
- Deutsche / englische Oberfläche (folgt der HA-Sprache)
- Klick öffnet den More-Info-Dialog der Entity

---

## Voraussetzungen

Die Card erwartet einen Sensor mit mindestens diesen Attributen:

| Attribut             | Beschreibung                             |
|----------------------|------------------------------------------|
| `address`            | Die Bitcoin-Adresse                      |
| `unconfirmed_count`  | Anzahl unbestätigter Transaktionen       |
| `pending_incoming`   | Unbestätigter Eingang (BTC)              |
| `pending_outgoing`   | Unbestätigter Ausgang (BTC)              |
| `pending_change`     | Netto-Pending-Änderung (BTC)             |
| `confirmed_balance`  | Bestätigter Saldo (optional, Fallback = State) |

Der **State** der Entity sollte der aktuelle (meist bestätigte) Saldo sein.

Diese Attribute werden typischerweise von der [Mempool Watch](https://github.com/)-Integration / den entsprechenden Sensoren bereitgestellt.

---

## Installation

### HACS (empfohlen)

1. **HACS** öffnen → **Frontend** (Dashboard)
2. Drei-Punkte-Menü → **Benutzerdefinierte Repositories**
3. Repository-URL dieses GitHub-Repos hinzufügen
4. Kategorie: **Dashboard** (oder Lovelace / Plugin)
5. **Herunterladen** / **Installieren**
6. Frontend neu laden (oder Browser-Cache leeren)

Nach der Installation wird die Resource in den meisten Setups automatisch registriert.

### Manuelle Installation

1. `btc-address-card.js` aus dem neuesten Release (oder aus dem Repository-Root) herunterladen
2. Datei nach `/config/www/btc-address-card/btc-address-card.js` kopieren  
   (oder einen beliebigen Pfad unter `/config/www/`)
3. Lovelace-Resource hinzufügen:

   **Über die UI**  
   Einstellungen → Dashboards → ⋮ → Ressourcen → Ressource hinzufügen  
   - URL: `/local/btc-address-card/btc-address-card.js`  
   - Typ: **JavaScript-Modul**

   **Über YAML**
   ```yaml
   lovelace:
     resources:
       - url: /local/btc-address-card/btc-address-card.js
         type: module
   ```

4. Home Assistant neu starten oder Ressourcen neu laden und Browser-Cache leeren.

---

## Konfiguration

### Minimales Beispiel

```yaml
type: custom:btc-address-card
entity: sensor.meine_btc_adresse
```

### Vollständiges Beispiel

```yaml
type: custom:btc-address-card
entity: sensor.meine_btc_adresse
name: Cold Wallet
card_color: [30, 136, 229]   # RGB
card_opacity: 85             # 0–100
```

### Optionen

| Name           | Typ      | Pflicht | Standard             | Beschreibung                                         |
|----------------|----------|---------|----------------------|------------------------------------------------------|
| `type`         | string   | **ja**  | –                    | `custom:btc-address-card`                            |
| `entity`       | string   | **ja**  | –                    | Sensor-Entity, die die BTC-Adressdaten bereitstellt  |
| `name`         | string   | nein    | Friendly Name        | Individueller Titel auf der Karte                    |
| `card_color`   | list[int]| nein    | Theme-Hintergrund    | RGB-Farbe für den Kartenhintergrund `[R, G, B]`      |
| `card_opacity` | number   | nein    | `100`                | Transparenz der Hintergrundfarbe (0–100)             |

---

## Visueller Editor

Die Card bringt einen vollständigen visuellen Konfigurations-Editor mit:

- Entity-Picker (zeigt nur kompatible BTC-Adress-Sensoren)
- RGB-Farbwähler
- Opacity-Slider (0–100)

Alles kann ohne YAML konfiguriert werden.

---

## Vorschau

Die Card erscheint im Lovelace-Card-Picker unter **BTC Address Card**.

Angezeigt werden:

- Titel + gekürzte Adresse
- Unbestätigte-TX-Badge (hervorgehoben wenn > 0)
- Großer bestätigter Saldo
- Vier Detailfelder: Eingang unbestätigt / Ausgang unbestätigt / Netto pending / Bestätigt

---

## Entwicklung & Mitwirken

Die Card ist in reinem Vanilla-JavaScript geschrieben (kein Build-Schritt nötig).

Mitwirken:

1. Repository forken
2. Änderungen an `btc-address-card.js` vornehmen
3. In Home Assistant testen (als lokale Resource einbinden)
4. Pull Request öffnen

---

## Lizenz

MIT – siehe [LICENSE](LICENSE)

---

## Credits

Inspiriert von gängigen Home-Assistant-Custom-Card-Mustern und optimiert für Mempool-Watch-Sensoren.
