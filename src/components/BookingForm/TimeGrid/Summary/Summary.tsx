export const Summary = () => {
  return (
    <div>Summary to be placed here</div>
    /* Wyświetlanie wybranego slotu */
    /* {selectedSlots.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Rezerwujesz termin:</h3>
          {(() => {
            const firstSlot = selectedSlots[0];
            const lastSlot = selectedSlots[selectedSlots.length - 1];
            return (
              <>
                <p>
                  Data:{' '}
                  {format(new Date(firstSlot.date), 'd MMMM yyyy', {
                    locale: pl,
                  })}
                </p>
                <p>
                  Godzina: {firstSlot.time} -{' '}
                  {hours[hours.indexOf(lastSlot.time) + 1] ||
                    format(
                      new Date(`2024-01-01T${lastSlot.time}`).setMinutes(
                        new Date(`2024-01-01T${lastSlot.time}`).getMinutes() +
                          15,
                      ),
                      'HH:mm',
                    )}
                </p>
                <p>Czas trwania: {selectedSlots.length * 15} minut</p>
              </>
            );
          })()}
        </div>
      )} */
  );
};
