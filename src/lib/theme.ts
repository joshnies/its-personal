export type Theme = "dark" | "light";
type ThemeInternal = "system" | "dark" | "light";
const ALL_THEMES: string[] = ["system", "dark", "light"];
const LOCAL_STORAGE_THEME = "theme";

/**
 * [Client]
 *
 * Returns the person's theme preference from local storage.
 * Defaults to "system", saving it to local storage.
 */
export function getTheme(): Theme {
  let theme: ThemeInternal;
  let themeStr = localStorage.getItem(LOCAL_STORAGE_THEME) ?? "";
  if (ALL_THEMES.includes(themeStr)) {
    theme = themeStr as ThemeInternal;
  } else {
    theme = "system";
    localStorage.setItem(LOCAL_STORAGE_THEME, theme);
  }

  if (theme === "system") {
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme:light)",
    ).matches;

    if (prefersLight) {
      return "light";
    }

    return "dark";
  }

  return theme;
}

/**
 * [Client]
 *
 * Sets the person's theme preference in local storage.
 */
export function setTheme(theme: Theme) {
  localStorage.setItem(LOCAL_STORAGE_THEME, theme);
}
