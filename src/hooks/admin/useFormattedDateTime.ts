import { DateTime } from 'luxon';
import { useContext } from 'react';

import { SettingsContext } from 'context/SettingsContextProvider';
import { SettingsId } from 'generated/sdk';

export function useFormattedDateTime(
  settingsFormatToUse = SettingsId.DATE_TIME_FORMAT,
  shouldUseTimeZone = false
) {
  const { settings } = useContext(SettingsContext);
  const format = settings.get(settingsFormatToUse)?.settingsValue;
  const timezone = settings.get(SettingsId.TIMEZONE)?.settingsValue;
  const mask = format?.replace(/[a-zA-Z]/g, '_');

  const toFormattedDateTime = (isoDateTime: string): string => {
    const dateTime = DateTime.fromISO(isoDateTime, {
      zone: (shouldUseTimeZone && timezone) || undefined,
    });

    if (!format) {
      // IF format is not provided return some default one from luxon
      return dateTime.toLocaleString(DateTime.DATETIME_SHORT);
    }

    return dateTime.toFormat(format);
  };

  return { toFormattedDateTime, format, mask, timezone };
}
