/**
 * 第2回 小テスト① を Google フォームとして作成する Apps Script。
 *
 * 使い方
 * 1. https://script.google.com で新規プロジェクトを作り、このコードを貼る。
 * 2. 関数 createQuiz を実行する（初回は権限の承認が必要）。
 * 3. 実行ログに、回答用URLと編集用URLが出る。
 *
 * 問題の正本は「第2回 小テスト①.md」。内容を変えたら、両方をそろえる。
 */
function createQuiz() {
  const form = FormApp.create('第2回 小テスト①（第1章範囲）');
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setDescription('各2点、10点満点。制限時間は約10分です。');

  const choiceItems = [
    {
      title: '1. ソフトウェア開発に工学的アプローチが必要になった主な理由を1つ選んでください。',
      choices: ['コンピュータが高価だから', '大規模化・多人数化で、個人技では品質が保てないから', '法律で義務づけられているから'],
      answer: 1,
    },
    {
      title: '4. ウォーターフォール型の特徴として正しいものを1つ選んでください。',
      choices: ['工程を行き来しながら進める', '工程を一方向に順に進める', '設計を省略する'],
      answer: 1,
    },
    {
      title: '5. 成果物（文書）を作る最大の目的はどれですか。',
      choices: ['作業の証拠を残すため', '次の工程や他の人へ、正確に引き継ぐため', '顧客に厚い納品物を見せるため'],
      answer: 1,
    },
  ];
  const textItems = [
    { title: '2. 開発の各工程で作られる文書や図などを、まとめて何と呼びますか。', answer: '成果物' },
  ];
  const orderChoiceItems = [
    {
      title: '3. 「何を作るかを決める工程」と「どう作るかを決める工程」のうち、先に行うのはどちらですか。',
      choices: ['何を作るかを決める工程', 'どう作るかを決める工程'],
      answer: 0,
    },
  ];

  // 問題番号の順に並べる
  const all = [
    { n: 1, kind: 'choice', item: choiceItems[0] },
    { n: 2, kind: 'text', item: textItems[0] },
    { n: 3, kind: 'choice', item: orderChoiceItems[0] },
    { n: 4, kind: 'choice', item: choiceItems[1] },
    { n: 5, kind: 'choice', item: choiceItems[2] },
  ];

  all.forEach(function (q) {
    if (q.kind === 'choice') {
      const mc = form.addMultipleChoiceItem();
      mc.setTitle(q.item.title).setPoints(2).setRequired(true);
      mc.setChoices(q.item.choices.map(function (c, i) {
        return mc.createChoice(c, i === q.item.answer);
      }));
    } else {
      const t = form.addTextItem();
      t.setTitle(q.item.title).setPoints(2).setRequired(true);
      t.setGeneralFeedback(
        FormApp.createFeedback().setText('正解：' + q.item.answer).build()
      );
    }
  });

  Logger.log('回答用URL: ' + form.getPublishedUrl());
  Logger.log('編集用URL: ' + form.getEditUrl());
}
