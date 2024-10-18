export function Score({ votes }: { votes: number }) {
  return (
    <div className="score">
      <div className="SUN">
        <div className="planet">
          <div className="face">
            <div className="eye">
              <div className="eye-in"></div>
            </div>
            <div className="mouth"></div>
            <div className="eye">
              <div className="eye-in"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="scoreText">
        <div className="text">{votes > 0 ? votes : 0}</div>
        <div className="text">:</div>
        <div className="text">{votes < 0 ? Math.abs(votes) : 0}</div>
      </div>
      <div className="MOON">
        <div className="planet">
          <div className="face">
            <div className="eye">
              <div className="eye-in"></div>
            </div>
            <div className="mouth"></div>
            <div className="eye">
              <div className="eye-in"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
