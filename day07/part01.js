const fs = require("fs");
const getType = (match) => {
  if (match.some((m) => m.length === 5)) return "5K";
  if (match.some((m) => m.length === 4)) return "4K";
  if (match.some((m) => m.length === 3) && match.some((m) => m.length === 2))
    return "FH";
  if (match.some((m) => m.length === 3)) return "3K";
  const f2p = match.filter((m) => {
    return m.length === 2;
  });
  if (f2p.length === 2) return "2P";
  const f1p = match.filter((m) => {
    return m.length === 2;
  });
  if (f1p.length === 1) return "1P";

  return "HC";
};
const comparecards = (card1, card2) => {
  for (let i = 0; i < card1.length; i++) {
    if (card1[i] !== card2[i])
      return sortcardvalue.indexOf(card2[i]) - sortcardvalue.indexOf(card1[i]);
  }
  return 0;
};
const sortcardvalue = "AKQJT98765432";
const sorthandvalue = ["HC", "1P", "2P", "3K", "FH", "4K", "5K"];
const hands = fs
  .readFileSync("./day07/input.txt", "utf-8")
  .split("\r\n")
  .map((line) => {
    const [cards, bid] = line.split(" ");
    const sortedcards = cards
      .split("")
      .sort((a, b) => {
        return sortcardvalue.indexOf(a) - sortcardvalue.indexOf(b);
      })
      .join("");
    const match = sortedcards.match(
      /A{1,5}|K{1,5}|Q{1,5}|J{1,5}|T{1,5}|9{1,5}|8{1,5}|7{1,5}|6{1,5}|5{1,5}|4{1,5}|3{1,5}|2{1,5}/g
    );
    const type = getType(match, sortedcards);
    return {
      cards: cards,
      match: match,
      sortedcards: sortedcards,
      bid: +bid,
      type: type,
    };
  })
  .sort((a, b) => {
    return a.type === b.type
      ? comparecards(a.cards, b.cards)
      : sorthandvalue.indexOf(a.type) - sorthandvalue.indexOf(b.type);
  });
console.log(
  hands.reduce((acc, curr, idx) => {
    return acc + +curr.bid * (idx + 1);
  }, 0)
);
