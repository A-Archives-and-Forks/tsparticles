# बैकग्राउंड मास्क

`backgroundMask` कणों को एक नकाबपोश पृष्ठभूमि परत के साथ टकराने या मिश्रित होने देता है।

## उदाहरण

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

- `enable`: बैकग्राउंड मास्किंग को सक्रिय करता है।
- `cover.color`: मास्क कवर का रंग।
- `cover.opacity`: अल्फ़ा स्तर को कवर करें।

## इसका उपयोग कब करना है

- स्पॉटलाइट जैसे प्रभाव।
- कंट्रास्ट-भारी नायक अनुभाग।
- गहरे रंग की पृष्ठभूमि पर स्तरित इंटरैक्शन।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
