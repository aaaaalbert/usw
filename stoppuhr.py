#!/usr/bin/env python
# -*- coding: utf-8 -*-
LOGDATEI = "stoppuhrlog.csv"
SEPARATOR = ";"

usage = """
Eine einfache Stoppuhr für Themen und Tätigkeiten.

Verwendung:

  ./stoppuhr.py THEMA

startet die Stoppuhr für das Thema THEMA. Die Stoppuhr wird mit der
Eingabe weiterer Details (z.B. der genauen Tätigkeit) beendet.

Die Stoppuhr hängt den Zeitpunkt ihres Aufrufes als Unix-Timestamp,
die Dauer ihres Laufes in Sekunden, das Thema sowie die Tätigkeit
an die Datei '""" + LOGDATEI + """' an.
Die Felder dieser Datei sind durch '""" + SEPARATOR + """' getrennt.
"""

import sys
import time

# Es wurde kein Thema angegeben. Hilfe anzeigen.
if len(sys.argv) != 2:
    print(usage)
    exit(0)


# Wir haben ein Thema. Los geht's!
thema = sys.argv[1]

with open(LOGDATEI, "a") as log:
    startzeit = int(time.time())
    tätigkeit = input("Bitte Tätigkeit eingeben (Enter stoppt die Stoppuhr): ")
    dauer = int(time.time() - startzeit)
    log.write(SEPARATOR.join([str(startzeit), str(dauer), thema, tätigkeit]) + "\n")
    print("Passt, danke!")

