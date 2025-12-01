type ComparisonRow = {
  feature: string;
  raccomandataMarket: string;
  attiGiudiziari: string;
};

export default function RaccomandataVsAttiTable({
  rows,
}: {
  rows: ComparisonRow[];
}) {
  if (!rows || rows.length === 0) return null;

  return (
    <section className="mt-10 letter-card">
      {/* Encabezado tipo carta */}
      <div className="letter-card__header">
        <div className="letter-card__header-left">
          <p className="letter-card__title">
            Differenza tra Raccomandata Market e Atti Giudiziari
          </p>
          <p className="letter-card__subtitle">
            Confronto rapido tra utilizzo, mittenti e valore legale.
          </p>
        </div>
        <div className="letter-card__stamp">
          <span className="letter-card__stamp-text">Posta</span>
        </div>
      </div>

      {/* Contenido carta */}
      <div className="letter-card__body">
        {/* 🖥️ Tabla desktop */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="letter-card__th">Caratteristica</th>
                  <th className="letter-card__th">Raccomandata Market</th>
                  <th className="letter-card__th">Atto Giudiziario</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx} className="letter-card__tr">
                    <td className="letter-card__td feature">{row.feature}</td>
                    <td className="letter-card__td">{row.raccomandataMarket}</td>
                    <td className="letter-card__td">{row.attiGiudiziari}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 📱 Cards mobile */}
        <div className="space-y-4 md:hidden">
          {rows.map((row, idx) => (
            <div key={idx} className="letter-card__mobile-row">
              <p className="letter-card__mobile-feature">{row.feature}</p>
              <div className="space-y-2">
                <div>
                  <p className="letter-card__mobile-label">
                    Raccomandata Market
                  </p>
                  <p className="letter-card__mobile-text">
                    {row.raccomandataMarket}
                  </p>
                </div>
                <div>
                  <p className="letter-card__mobile-label">Atto Giudiziario</p>
                  <p className="letter-card__mobile-text">
                    {row.attiGiudiziari}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
