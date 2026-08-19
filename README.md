import tkinter as tk
from tkinter import messagebox
from datetime import datetime

# Texas Longhorns 2026 football schedule
games = [
    ("Aug 30, 2026", "Texas State", "Home"),
    ("Sep 5, 2026", "Ohio State", "Away"),
    ("Sep 12, 2026", "UTEP", "Home"),
    ("Sep 19, 2026", "Sam Houston", "Home"),
    ("Sep 26, 2026", "Oklahoma", "Away"),
    ("Oct 3, 2026", "Mississippi State", "Home"),
    ("Oct 10, 2026", "Vanderbilt", "Away"),
    ("Oct 17, 2026", "Georgia", "Home"),
    ("Oct 31, 2026", "Kentucky", "Away"),
    ("Nov 7, 2026", "BYU", "Home"),
    ("Nov 14, 2026", "Arkansas", "Away"),
    ("Nov 28, 2026", "Texas A&M", "Home")
]

# Create the main window
root = tk.Tk()
root.title("Texas Longhorns GameDay")
root.geometry("500x600")

# Title
title = tk.Label(
    root,
    text="🤘 Texas Longhorns GameDay",
    font=("Arial", 22, "bold")
)
title.pack(pady=20)

subtitle = tk.Label(
    root,
    text="Upcoming Texas Football Games",
    font=("Arial", 14)
)
subtitle.pack(pady=5)

# Frame for games
game_frame = tk.Frame(root)
game_frame.pack(pady=20)

# Display games
for date, opponent, location in games:

    if location == "Home":
        location_text = "Austin, TX"
    else:
        location_text = "Away"

    game = tk.Label(
        game_frame,
        text=f"{date}\nTexas vs. {opponent}\n{location_text}",
        font=("Arial", 12),
        relief="groove",
        padx=15,
        pady=10,
        width=35
    )

    game.pack(pady=5)


# Function for showing the next game
def show_next_game():

    messagebox.showinfo(
        "Next Game",
        f"Texas vs. {games[0][1]}\n\n"
        f"Date: {games[0][0]}\n"
        f"Location: {games[0][2]}"
    )


button = tk.Button(
    root,
    text="🏈 Show Next Game",
    command=show_next_game,
    font=("Arial", 12),
    padx=20,
    pady=10
)

button.pack(pady=20)


root.mainloop()

